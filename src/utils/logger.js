import chalk from "chalk";

export const succesLog = (message) => {
	console.log(chalk.green(message));
};

export const errorLog = (message) => {
	console.log(chalk.red(message));
};

export const warningLog = (message) => {
	console.log(chalk.yellow(message));
};

export const infoLog = (message) => {
	console.log(chalk.blue(message));
};
