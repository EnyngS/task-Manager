type develpersType = {
	id: number;
	mentor?: true;
	name: string;
	url: {
	  git: string;
	};
 };
export type CounterState = {
	 lang: string,
	 developers: develpersType[];
	 error: {
		message: string;
	}
 }