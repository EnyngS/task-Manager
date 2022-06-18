
export type Iuser = {
	isAuth: boolean,
	id: string,
	username: string,
	login: string,
	email: string,
	password: string,
	token: string,
};
export type CounterState = {
	user: Iuser
}