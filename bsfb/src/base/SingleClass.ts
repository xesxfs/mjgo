
class SingleClass {

	public static getInstance(){
		var Class:any = this;
		if(Class.instance ==null){
			Class.instance = new Class();
		}
		return Class.instance
	}

}