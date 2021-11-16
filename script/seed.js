"use strict";

const {
  db,
  User,
  Video,
  Order,
  OrderVideo,
  userUniqueVideo,
} = require("../server/db/index");

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
      imageURL: "https://i.ytimg.com/vi/uQ5A0owPFk0/maxresdefault.jpg",
      category: 1,
    }),
    Video.create({
      title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
      price: 1000,
      unitsInStock: 20,
      authorName: "Takumi",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/https://miro.medium.com/max/800/1*YhIXFNRgs5urKD6G3D04sw.jpeg/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
      category: 2,
    }),
    Video.create({
      title: "Python for Data Science and Machine Learning Bootcamp",
      price: 1000,
      unitsInStock: 20,
      authorName: "Takumi",
      description: "Tech Video",
      imageURL:
        "https://learnrepeatacademy.com/wp-content/uploads/2020/07/Python-Bootcamp-Cover.png",
      category: 3,
    }),
    Video.create({
      title: "Build Web Apps with React & Firebase",
      price: 1000,
      unitsInStock: 20,
      authorName: "Jian",
      description: "Tech Video",
      imageURL: "https://i.morioh.com/200910/b119e8ba.webp",
      category: 4,
    }),
    Video.create({
      title: "The Complete NFT Web Development Course - Zero To Expert",
      price: 1000,
      unitsInStock: 20,
      authorName: "Jian",
      description: "Tech Video",
      imageURL:
        "https://miro.medium.com/max/1400/1*G3l_HIHH2Nn0Hu-fkORl7A.jpeg ",
      category: 5,
    }),
    Video.create({
      title: "100 Days Of Code - Web Development Bootcamp",
      price: 1000,
      unitsInStock: 20,
      authorName: "Tandeep",
      description: "Tech Video",
      imageURL:
        "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/QEY2ZW45ABHM3PPY36IJHWHLGM.jpg",
      category: 1,
    }),
    Video.create({
      title: "Ultimate AWS Certified Solutions Architect Associate 2021",
      price: 1000,
      unitsInStock: 20,
      authorName: "Tandeep",
      description: "Tech Video",
      imageURL: "https://cloudskills.io/images/aws-cloud-architect.png",
      category: 1,
    }),
    Video.create({
      title: "TOTAL: CompTIA A+ Certification (220-1001)",
      price: 1000,
      unitsInStock: 20,
      authorName: "Sarah",
      description: "Tech Video",
      imageURL:
        "https://www.it-ology.org/wp-content/uploads/2019/12/a0977aa6ae2b4ffbab686e2d924caf3b.jpg",
      category: 3,
    }),
    Video.create({
      title: "Angular - The Complete Guide",
      price: 1000,
      unitsInStock: 20,
      authorName: "Joey",
      description: "Tech Video",
      imageURL:
        "https://media.freebiesglobal.com/thumbs_dir/the-angular-bootcamp-2020-oqbrertz9sq4slybe7aoovh1o9xt0s9xq8wdcaosfu.jpg",
      category: 2,
    }),
    Video.create({
      title: "The Complete JavaScript Course 2021: From Zero to Expert!",
      price: 1000,
      unitsInStock: 20,
      authorName: "Shashi",
      description: "Tech Video",
      imageURL:
        "https://coursemarks.com/wp-content/uploads/2020/11/1456642_de18_3.jpg",
      category: 4,
    }),
  ]);

  //Creating Orders //possible duplicate values
  const order = await Promise.all([
    Order.create({ userId: 1, isCart: true }),
    Order.create({ userId: 1 }),
    Order.create({ userId: 1 }),
    Order.create({ userId: 2, isCart: true }),
    Order.create({ userId: 1 }),
    Order.create({ userId: 1 }), //<--Repeat Order
    Order.create({ userId: 4, isCart: true }),
    Order.create({ userId: 6 }),
    Order.create({ userId: 3 }),
    Order.create({ userId: 9 }),
    Order.create({ userId: 11 }),
    Order.create({ userId: 5 }),
    Order.create({ userId: 7 }),
    Order.create({ userId: 8 }),
  ]);

  //Creating orderVideos
  const orderVideos = await Promise.all([
    OrderVideo.create({ qty: 1, videoId: 1, orderId: 4 }),
    OrderVideo.create({ qty: 1, videoId: 5, orderId: 5 }),
    OrderVideo.create({ qty: 1, videoId: 1, orderId: 6 }),
    OrderVideo.create({ qty: 1, videoId: 7, orderId: 7 }),
    OrderVideo.create({ qty: 1, videoId: 9, orderId: 8 }),
    OrderVideo.create({ qty: 1, videoId: 8, orderId: 9 }),
    OrderVideo.create({ qty: 1, videoId: 4, orderId: 10 }),
    OrderVideo.create({ qty: 1, videoId: 10, orderId: 11 }),
    OrderVideo.create({ qty: 1, videoId: 10, orderId: 12 }),
    OrderVideo.create({ qty: 1, videoId: 6, orderId: 13 }),
    OrderVideo.create({ qty: 1, videoId: 4, orderId: 14 }),
  ]);

  //no duplicate videos per user
  await Promise.all([
    userUniqueVideo.create({ videoId: 1, userId: 2 }),
    userUniqueVideo.create({ videoId: 5, userId: 1 }),
    userUniqueVideo.create({ videoId: 1, userId: 1 }),
    userUniqueVideo.create({ videoId: 7, userId: 4 }),
    userUniqueVideo.create({ videoId: 9, userId: 6 }),
    userUniqueVideo.create({ videoId: 8, userId: 3 }),
    userUniqueVideo.create({ videoId: 4, userId: 9 }),
    userUniqueVideo.create({ videoId: 10, userId: 11 }),
    userUniqueVideo.create({ videoId: 10, userId: 5 }),
    userUniqueVideo.create({ videoId: 6, userId: 7 }),
    userUniqueVideo.create({ videoId: 4, userId: 8 }),
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
