const prisma = require('../prisma')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const register = async (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                email: data.email,
                password: hashedPassword,
            },
        });

        if (user) {
            delete user.password
            res.status(201).json({ statusValue: 1, statusText: "Registration Successfull", user });
        }
    } catch (error) {
        res.status(500).json({ statusValue: 1, statusText: "Registration failed" });

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return res.status(401).json({ statusValue: 0, statusText: "Invalid Email or Password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ statusValue: 0, statusText: "Invalid Email or Password" });
        }
        delete user.password;
        res.status(200).json({ statusValue: 1, statusText: "Login Successful", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ statusValue: 0, statusText: "Login Failed" });
    }
};
const bookHotel = async (req, res) => {
    try {
        const details = req.body;
        const hotel = await prisma.hotel.create({
            data: {
                id: uuidv4(),
                name: details.name,
                price: details.price,
                members: details.members,
                userId: details.userId,
                createdAt: new Date()
            },
        })
        res.status(201).json({ statusValue: 1, statusText: "Hotel booked Successfully" })
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ statusValue: 1, statusText: "Hotel booking failed" })

    }
}

module.exports = {
    register,
    login,
    bookHotel
}