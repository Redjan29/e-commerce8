// backend/server.js
const app = require('./app');



const PORT = 5001;

app.listen(process.env.PORT||PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
