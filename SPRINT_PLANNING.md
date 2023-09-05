**Sprint Planning: Project Tasks**

01. **DINDIN-1:** Create a new PostgreSQL database named 'dindin'.
    - **Subtasks:** 
     - ✅ Write SQL script to create the 'usuarios' table.
     - ✅ Write SQL script to create the 'categorias' table.
     - ✅ Write SQL script to create the 'transacoes' table.
     - ✅ Populate the 'categorias' table with predefined categories.
     - ✅ Set up the Node.js server with Express.js.

02. **DINDIN-2:** Implement user registration (POST /usuario).
    - **Subtasks:** 
     - ✅ Implement validation for required fields.
     - ✅ Handle duplicate email registration.
     - ✅ Encrypt and store user passwords.

03. **DINDIN-3:** Implement user login (POST /login).
    - **Subtasks:** 
     - Implement email and password validation.
     - Generate and return authentication tokens. 

04. **DINDIN-4:** Implement user listing (GET /login).
    - **Subtasks:** 
     - Only the user himself can access this page.

05. **DINDIN-5:** Implement updating user profile (PUT /usuario). 
    - **Subtasks:** 
     - Validate required fields.
     - Check for duplicate email while updating.
     - Encrypt and update user password.

06. **DINDIN-6:** Implement listing categories (GET /categoria) and user transactions (GET /transacao).
    - **Subtasks:** 
     - Filter transactions based on user.
     - Implement pagination if needed.

07. **DINDIN-7:** Implement creating transactions (POST /transacao).
    - **Subtasks:** 
      - Validate required fields.
      - Check if the category exists.
      - Associate the transaction with the user.

08. **DINDIN-8:** Implement getting transaction details (GET /transacao/:id) and updating transactions (PU /transacao/:id).
    - **Subtasks:** 
      - Validate required fields.
      - Check if the category exists.
      - Check if the transaction belongs to the user.

09. **DINDIN-9:** Implement deleting transactions (DELETE /transacao/:id).
    - **Subtasks:** 
      - Check if the transaction belongs to the user.

10. **DINDIN-10:** Implement getting transaction extrato (GET /transacao/extrato).

11. **DINDIN-11:** Implement filtering transactions by category (GET /transacao?filtro=[]).
    - **Subtasks:** 
      - Validate query parameter.
      - Filter transactions based on categories.
