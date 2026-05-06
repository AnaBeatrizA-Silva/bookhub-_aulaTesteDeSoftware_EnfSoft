const User = require('../modules/user/user.model');
const Book = require('../modules/book/book.model');
const Category = require('../modules/book/category.model');
const BookCategory = require('../modules/book/bookCategory.model');
const Favorite = require('../modules/interaction/favorite.model');
const Review = require('../modules/interaction/review.model');
const ReadingProgress = require('../modules/reading/progress.model');
const ReadingHistory = require('../modules/reading/history.model');
const Notification = require('../modules/notification/notification.model');

// N:N Book-Categories
Book.belongsToMany(Category, { through: BookCategory });
Category.belongsToMany(Book, { through: BookCategory });

// Favorites
User.belongsToMany(Book, { through: Favorite });
Book.belongsToMany(User, { through: Favorite });

// Reviews
User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

// Reading
User.hasMany(ReadingProgress);
ReadingProgress.belongsTo(User);

Book.hasMany(ReadingProgress);
ReadingProgress.belongsTo(Book);

User.hasMany(ReadingHistory);
ReadingHistory.belongsTo(User);

Book.hasMany(ReadingHistory);
ReadingHistory.belongsTo(Book);

// Notifications
User.hasMany(Notification);
Notification.belongsTo(User);

module.exports = {};