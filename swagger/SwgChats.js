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
  };
  
  module.exports = chatCtrl;
  