
declare function JSLINQ(dataItems:any):LINQ

interface LINQ{
	Where(clause):LINQ;
	ToArray();
	Select(clause):LINQ;
	OrderBy(clause):LINQ;
	OrderByDescending(clause):LINQ;
	SelectMany(clause):LINQ;
	Count(clause):number;
	Distinct(clause):LINQ;
	Any(clause):LINQ;
	All(clause):LINQ;
	Reverse():LINQ;
	First(clause):any;
	Last(clause):any;
	ElementAt(index):any;
	Concat(array):LINQ;
	Intersect(secondArray,clause):LINQ;
	DefaultIfEmpty(defaultValue):any;
	ElementAtOrDefault(index,defaultValue):any;
	FirstOrDefault(defaultValue);
	LastOrDefault(defaultValue);


}