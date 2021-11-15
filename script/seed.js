"use strict";

const { db, User, Video, Order } = require("../server/db/index");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody@gmail.com",
      password: "123",
      firstName: "cody",
      lastName: "banks",
      address: "419 Trantow Skyway\nDollyport, KY 28406-2282",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "murphy@gmail.com",
      password: "123",
      firstName: "murphy",
      lastName: "brown",
      address: "1810 Hiram Mountain\nNew Maechester, CA 31787-1942",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "Mathilde@gmail.com",
      password: "123",
      firstName: "Mathilde",
      lastName: "Schneider",
      address: "1810 Hiram Mountain\nNew Maechester, CA 31787-1942",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    }),
    User.create({
      username: "Jaleel@gmail.com",
      password: "123",
      firstName: "Jaleel",
      lastName: "Bode",
      address: "632 Hortense Roads Suite 875\nHamillberg, OR 39790-6770",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "Jarrett@gmail.com",
      password: "123",
      firstName: "Jarrett",
      lastName: "Kreiger",
      address: "1019 Domenica Lake Suite 191\nNew Freidahaven, WI 14195",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "Asia@gmail.com",
      password: "123",
      firstName: "Asia",
      lastName: "Reilly",
      address:
        "39546 Tressa Expressway Apt. 466\nNorth Katharinamouth, VT 45825-3766",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    }),
    User.create({
      username: "Helene@gmail.com",
      password: "123",
      firstName: "Helene",
      lastName: "Wuckert",
      address: "127 Rosenbaum Squares Suite 658\nYostland, MS 64937-3476",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    }),
    User.create({
      username: "Krystina@gmail.com",
      password: "123",
      firstName: "Krystina",
      lastName: "Aufderhar",
      address: "654 Gerhold Street Suite 556\nNorth Odieview, WV 15513-8263",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    }),
    User.create({
      username: "Bernard@gmail.com",
      password: "123",
      firstName: "Bernard",
      lastName: "Corkery",
      address: "6095 Luna Rue\nPort Raven, MS 58904",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "Destiney@gmail.com",
      password: "123",
      firstName: "Destiney",
      lastName: "Franecki",
      address: "602 Dickinson Estate Suite 842\nWest Nobleshire, OK 42744-7204",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/men/75.jpg",
    }),
    User.create({
      username: "Alvah@gmail.com",
      password: "123",
      firstName: "Alvah",
      lastName: "Hagenes",
      address: "2963 Vincent Ways\nNew Alverta, LA 25139",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    }),
    User.create({
      username: "Myriam@gmail.com",
      password: "123",
      firstName: "Myriam",
      lastName: "Shields",
      address: "5025 Erna Valley Suite 892\nWehnerhaven, GA 65976",
      isAdmin: false,
      userimageURL: "https://randomuser.me/api/portraits/women/75.jpg",
    }),
  ]);

  // https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg
  // Creating Videos
  const videos = await Promise.all([
    Video.create({
      title: "2022 Complete Python Bootcamp From Zero to Hero in Python",
      price: 1000,
      unitsInStock: 20,
      authorName: "FSA",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
      price: 1000,
      unitsInStock: 20,
      authorName: "Takumi",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "Python for Data Science and Machine Learning Bootcamp",
      price: 1000,
      unitsInStock: 20,
      authorName: "Takumi",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "Build Web Apps with React & Firebase",
      price: 1000,
      unitsInStock: 20,
      authorName: "Jian",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "The Complete NFT Web Development Course - Zero To Expert",
      price: 1000,
      unitsInStock: 20,
      authorName: "Jian",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "100 Days Of Code - Web Development Bootcamp",
      price: 1000,
      unitsInStock: 20,
      authorName: "Tandeep",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "Ultimate AWS Certified Solutions Architect Associate 2021",
      price: 1000,
      unitsInStock: 20,
      authorName: "Tandeep",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "TOTAL: CompTIA A+ Certification (220-1001)",
      price: 1000,
      unitsInStock: 20,
      authorName: "Sarah",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "Angular - The Complete Guide",
      price: 1000,
      unitsInStock: 20,
      authorName: "Joey",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
    Video.create({
      title: "The Complete JavaScript Course 2021: From Zero to Expert!",
      price: 1000,
      unitsInStock: 20,
      authorName: "Shashi",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
    }),
  ]);

  //Creating Orders
  const order = await Promise.all([
    Order.create({ videoId: 2, userId: 1 }),
    Order.create({ videoId: 3, userId: 1 }),
    Order.create({ videoId: 1, userId: 1 }),
    Order.create({ videoId: 1, userId: 2 }),
    Order.create({ videoId: 5, userId: 1 }),
    Order.create({ videoId: 1, userId: 1 }), //<--Repeat Order
    Order.create({ videoId: 7, userId: 4 }),
    Order.create({ videoId: 9, userId: 6 }),
    Order.create({ videoId: 8, userId: 3 }),
    Order.create({ videoId: 4, userId: 9 }),
    Order.create({ videoId: 10, userId: 11 }),
    Order.create({ videoId: 10, userId: 5 }),
    Order.create({ videoId: 6, userId: 7 }),
    Order.create({ videoId: 4, userId: 8 }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
