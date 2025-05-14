import 'dotenv/config';
import app from './app';
import chalk from 'chalk';

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(chalk.cyan.underline(`LMS Insights Backend Server is running at http://localhost:${PORT}`));
});
