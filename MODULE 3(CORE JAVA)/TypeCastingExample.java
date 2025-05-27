public class TypeCastingExample {
    public static void main(String[] args) {
        double doubleVal = 9.78;
        int intVal = (int) doubleVal;
        int originalInt = 42;
        double castedDouble = originalInt;

        System.out.println("Double to int: " + intVal);
        System.out.println("Int to double: " + castedDouble);
    }
}
