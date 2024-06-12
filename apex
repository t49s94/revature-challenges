/*
Create a class called Calculator with a single method called Add. This method should take 2 Integer 
parameters and return their sum.
*/
public class Calculator {

    public static Integer add(Integer num1, Integer num2) {
        Integer result = num1 + num2;
        return result;
    }
    
    /*
	Create a method called Multiply that takes 2 Integer parameters and returns their product. 
You are not allowed to use the * operator to multiply the two Integers, and you must use your 
Add method you created in Challenge I.
	*/
    public static Integer multiply(Integer num1, Integer num2) {
        Integer result = 0;
        for(Integer i = 0; i < num2; i++) {
            result = add(result, num1);
        }
        return result;
    }
    
    /*
	Create a method called Divide that takes 2 Integer parameters and returns their quotient 
(Parameter 1 / Parameter 2). Once again, you are not allowed to use the / operator, and you must use 
your Add method. For this challenge, do not consider if zero is the divisor.
	*/
    public static Integer divide(Integer num1, Integer num2) {
        Integer result = 0;
        Integer remaining = num1;
        
        while(remaining >= num2) {
            remaining = add(remaining, -1 * num2);
            result++;
        }
        
        return result;
    }
    
    /*
	Modify your Divide method so that it will return 0 if zero is the divisor.
	*/
    public static Integer divideZeroSupported(Integer num1, Integer num2) {
        if(num2 == 0) {
            return 0;
        }
        
        Integer result = 0;
        Integer remainder = num1;
        
        while(remainder >= num2) {
            remainder = add(remainder, -1 * num2);
            result++;
        }
        
        return result;
    }
    
    /*
	Create a method called Mod that takes 2 Integer parameters and returns their remainder. 
You are not allowed to use the Math.Mod() method.
	*/
    public static Integer mod(Integer num1, Integer num2) {
        if(num2 == 0) {
            return num1;
        }
        
        Integer remainder = num1;
        
        while(remainder >= num2) {
            remainder = add(remainder, -1 * num2);
        }
        
        return remainder;
    }
    
}



