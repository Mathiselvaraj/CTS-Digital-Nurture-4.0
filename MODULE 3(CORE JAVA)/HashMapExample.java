import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < 2; i++) {
            System.out.print("Enter ID: ");
            int id = scanner.nextInt();
            scanner.nextLine(); // Consume newline
            System.out.print("Enter Name: ");
            String name = scanner.nextLine();
            studentMap.put(id, name);
        }
        System.out.print("Enter ID to search: ");
        int searchId = scanner.nextInt();
        System.out.println("Name: " + studentMap.getOrDefault(searchId, "Not found"));
    }
}