# TxBot Chatbot UI

A responsive web-based chatbot interface for the TxBot token management platform.

## Features

✨ **Modern Interface**
- Clean, gradient-based design
- Responsive mobile-friendly layout
- Smooth animations and transitions

💬 **Chat Functionality**
- Real-time message display
- User and bot message differentiation
- Automatic scrolling to latest messages
- Timestamp for each message
- Conversation history with selectable topics and short IDs, saved in the current browser
- Welcome greeting defaults to `Debugger`; users can change the display name, which is saved locally in the current browser

🎯 **Quick Start**
- Requires Node.js 18+ and npm
- Uses Vite for local development and production builds
- Easy to customize

## Files

- `index.html` - Main chatbot interface
- `styles.css` - Styling and animations
- `script.js` - Chat logic and message handling
- `README.md` - This file

## Usage

1. Run `npm ci` from `chatbot.ui/`
2. Run `npm run dev -- --host 0.0.0.0`
3. Open the local URL printed by Vite
4. Set your first name in the welcome prompt if desired
5. Type a message or choose a quick prompt

The demo does not have authentication and cannot read a server-side account name. The optional first name is stored in the browser only.

## Customize

### Change Colors
Edit the gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Bot Responses
Edit `botResponses` in `script.js`:
```javascript
const botResponses = {
    'your-keyword': 'Your custom response',
    // ...
};
```

### Change Bot Name
Update `<title>` and `.chat-header h1` in `index.html`

## Integration

To connect to a real backend:

1. Replace the `getBotResponse()` function in `script.js` with an API call:
```javascript
async function getBotResponse(userMessage) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    return data.reply;
}
```

2. Update the chat form handler to use `await`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Demo

You can test the chatbot locally:
1. Install Node.js 18+ and npm
2. Navigate to the `chatbot.ui` directory
3. Run `npm ci`
4. Run `npm run dev -- --host 0.0.0.0`
5. Open the local URL printed by Vite

## Quick Start Commands

Try asking the chatbot:
- "hello" - Get a greeting
- "help" - See available commands
- "token" - Learn about tokens
- "security" - Understand security features
- "pilot" - Ask about the 90-day pilot program
- "providers" - See the TradeX and TX services listed in the FAQ

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line (if multi-line input enabled)

## Troubleshooting

**Messages not appearing?**
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Clear browser cache and reload

**Styling looks wrong?**
- Ensure `styles.css` is in the same directory as `index.html`
- Check file permissions
- Try a different browser

## API Integration Example

Here's how to connect to a Python backend (like Kenwell.py):

```javascript
async function getBotResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        if (!response.ok) throw new Error('Network response failed');
        
        const data = await response.json();
        return data.reply || 'No response received';
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}
```

## License

MIT - Part of TxBot Project

## Next Steps

- [x] Basic chatbot UI ✅
- [ ] Backend API integration
- [ ] User authentication
- [ ] Message persistence
- [ ] Admin dashboard
- [ ] Advanced AI responses
- [ ] Voice input/output
- [ ] Multi-language support

## Contributing

Want to improve the chatbot UI? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## Support

For questions or issues, please open a GitHub issue in the main repository.

---

**TxBot** - Token Management AI Assistant | Powered by KENWELL-TX-ORG
