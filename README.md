**Binary Studio**

Text to Binary and Binary to Text with password converter

using HTML, CSS, and JS

**How it works**

1. User enters a message
Example: “Hello”

2. User sets a password
The password is converted into a numeric key using a hash function.

3. Encryption process
-> Each character in the message is converted into ASCII.
-> ASCII values are XOR-encrypted using the password key.
-> The encrypted values are converted into 8-bit binary.

4. Encrypted binary output is generated
This binary code is shared with the receiver.

5. Decryption process
-> The receiver enters the encrypted binary and the same password.
-> Binary is converted back to numbers.
-> XOR operation with the password key restores the original text.

**Real-time Example**

When the Sender enters the message “Hi” and sets a password “1234”. The encrypt option is used, the system applies password-based encryption, and converts the message into binary format. The receiver pastes the encrypted binary code 01001101 01000000 into the application and enters the same password “1234”.
The system decrypts the binary data using the password and converts it back into readable text.

