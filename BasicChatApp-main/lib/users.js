import bcrypt from 'bcryptjs'; 

// In-memory user storage (replace with a database in production)
const users = [
    { 
      id: "1",
      name: 'Shan',
      email: 'shan@gmail.com',
      password: "$2b$10$kiv6l43dKghpEoyl6ZsNsu7EVyGzL6OWMnqw2vPVe0ur3JVWX.jrW", // Hashed "password123"
    },
    {
      id:"2",
      name: "Haider",
      email: "baby@gmail.com",
      password: '$2b$10$zOcznIdJPcaGCU0nqQ1tYex4xS2VyUkCGa21osAOeZfHOcQiAH2iS', // Hashed "justborn"
    }
  ];
  
  export function getUsers() {
    return users;
  }
  
  export async function addUser(user) {

    // hashing:
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(hashedPassword)
    const newUser = {...user, id:String(users.length +1), password:hashedPassword};

    users.push(newUser);

    return newUser
  }

  export async function verifyPassword(email, password){
    const user = users.find((u) => email === u.email);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }