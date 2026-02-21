const express = require('express');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:", "https://images.unsplash.com"],
      mediaSrc: ["'self'", "https:", "https://videos.pexels.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      frameSrc: ["'self'"],
    },
  },
}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');
// Routes
const pagesRouter = require('./routes/pages');
app.use('/', pagesRouter);
// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});
app.listen(PORT, () => console.log(`Vibra running on http://localhost:${PORT}`));