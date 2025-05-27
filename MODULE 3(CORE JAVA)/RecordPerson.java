import java.util.*;

record Person(String name, int age) {}

public class RecordPerson {
    public static void main(String[] args) {
        List<Person> people = List.of(new Person("Alice", 30), new Person("Bob", 25));
        people.stream().filter(p -> p.age() > 26).forEach(System.out::println);
    }
}