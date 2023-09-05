**Sprint Planning: Project Tasks**

01. **DINDIN-1:** Create a new PostgreSQL database named 'dindin'.
   - **Subtasks:** 
     - Write SQL script to create the 'usuarios' table.
     - Write SQL script to create the 'categorias' table.
     - Write SQL script to create the 'transacoes' table.
     - Populate the 'categorias' table with predefined categories.
     - Set up the Node.js server with Express.js.

02. **DINDIN-2:** Implement user registration (POST /usuario).
   - **Subtasks:** 
     - Implement validation for required fields.
     - Encrypt and store user passwords.
     - Handle duplicate email registration.

03. **DINDIN-3:** Implement user login (POST /login).
   - **Subtasks:** 
     - Implement email and password validation.
     - Generate and return authentication tokens. 

04. **DINDIN-4:** Implement updating user profile (PUT /usuario). 
   - **Subtasks:** 
     - Validate required fields.
     - Check for duplicate email while updating.
     - Encrypt and update user password.

05. **DINDIN-5:** Implement listing categories (GET /categoria) and user transactions (GET /transacao).
   - **Subtasks:** 
     - Filter transactions based on user.
     - Implement pagination if needed.

06. **DINDIN-6:** Implement creating transactions (POST /transacao).
    - **Subtasks:** 
      - Validate required fields.
      - Check if the category exists.
      - Associate the transaction with the user.

07. **DINDIN-7:** Implement getting transaction details (GET /transacao/:id) and updating transactions (PU /transacao/:id).
    - **Subtasks:** 
      - Validate required fields.
      - Check if the category exists.
      - Check if the transaction belongs to the user.

08. **DINDIN-8:** Implement deleting transactions (DELETE /transacao/:id).
    - **Subtasks:** 
      - Check if the transaction belongs to the user.

09. **DINDIN-9:** Implement getting transaction extrato (GET /transacao/extrato).

10. **DINDIN:** Implement filtering transactions by category (GET /transacao?filtro=[]).
    - **Subtasks:** 
      - Validate query parameter.
      - Filter transactions based on categories.

