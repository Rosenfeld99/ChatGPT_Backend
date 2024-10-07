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
      const userId = req.params.userId;
      const chatId = req.params.id; // Assuming the chat ID is passed in the URL
  
      try {
        // Delete the chat from the Chat collection
        await Chat.deleteOne({ _id: chatId, userId });
  
        // Remove the chat from the UserChats
        await UserChats.updateOne(
          { userId: userId },
          {
            $pull: {
              chats: { _id: chatId },
            },
          }
        );
  
        res.status(200).send("Chat deleted successfully!");
      } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting chat!");
      }
    },
  };
  
  module.exports = chatCtrl;
  