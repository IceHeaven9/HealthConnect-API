import chalk from 'chalk';

// Logea un mensaje de éxito en la consola con color verde

export const succesLog = (message) => {
	console.log(chalk.green(message));
};

// Logea un mensaje de error en la consola con color rojo

export const errorLog = (message) => {
	console.log(chalk.red(message));
};

// Logea un mensaje de advertencia en la consola con color amarillo

export const warningLog = (message) => {
	console.log(chalk.yellow(message));
};

// Logea un mensaje de información en la consola con color azul

export const infoLog = (message) => {
	console.log(chalk.blue(message));
};
