/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Operations related to chats and UserChats.
 */

const chatCtrl = {
  /**
   * @swagger
   * /api/test:
   *   get:
   *     summary: Test the chat controller
   *     tags: [Chats]
   *     responses:
   *       200:
   *         description: A successful response
   */
  testChat: (req, res) => {
    return res.json({ msg: "test working!!!" });
  },

  /**
   * @swagger
   * /api/chats/{userId}:
   *   post:
   *     summary: Create a new chat
   *     tags: [Chats]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: text
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       201:
   *         description: Chat created successfully
   *       500:
   *         description: Error creating chat
   */
  createChat: async (req, res) => {
    // ... existing code
  },

  /**
   * @swagger
   * /api/chats/{userId}/{id}:
   *   get:
   *     summary: Get a single chat by user ID and chat ID
   *     tags: [Chats]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chat fetched successfully
   *       500:
   *         description: Error fetching chat
   */
  geteSingleChat: async (req, res) => {
    // ... existing code
  },

  /**
   * @swagger
   * /api/chats/{userId}/{id}:
   *   put:
   *     summary: Edit a chat
   *     tags: [Chats]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: question
   *         required: false
   *         schema:
   *           type: string
   *       - in: body
   *         name: answer
   *         required: true
   *         schema:
   *           type: string
   *       - in: body
   *         name: img
   *         required: false
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chat updated successfully
   *       500:
   *         description: Error updating chat
   */
  editChat: async (req, res) => {
    // ... existing code
  },

  /**
   * @swagger
   * /api/userChats/{userId}:
   *   get:
   *     summary: Get all chats for a user
   *     tags: [Chats]
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User chats fetched successfully
   *       500:
   *         description: Error fetching user chats
   */
  getUserChats: async (req, res) => {
    // ... existing code
  },
  /**
   * @swagger
   * /chats/{userId}/{id}:
   *   delete:
   *     summary: Delete a chat
   *     tags: [Chats]
   *     parameters:
   *       - name: userId
   *         in: path
   *         required: true
   *         description: ID of the user whose chat is to be deleted
   *         schema:
   *           type: string
   *       - name: id
   *         in: path
   *         required: true
   *         description: ID of the chat to be deleted
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Chat deleted successfully
   *       500:
   *         description: Error deleting chat
   */
  deleteChat: async (req, res) => {
    // ... existing code
  },
  /**
   * @swagger
   * /api/chats/{userId}/chats/{id}/rename:
   *   put:
   *     summary: Rename a chat title
   *     description: Updates the title of a specific chat for a user.
   *     tags:
   *       - Chats
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: ID of the user to whom the chat belongs
   *         schema:
   *           type: string
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the chat to be renamed
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               newTitle:
   *                 type: string
   *                 description: The new title for the chat
   *                 example: "Updated Chat Title"
   *     responses:
   *       200:
   *         description: Chat title updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: Chat title updated successfully!
   *       404:
   *         description: Chat not found or title is the same as before
   *       500:
   *         description: Error renaming chat
   */
  renameChat: async (req, res) => {
    // ... existing code
  },
};

module.exports = chatCtrl;
