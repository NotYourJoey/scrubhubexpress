# ScrubHub Express - WhatsApp Integration

This project now includes a backend server that can send WhatsApp messages directly from the website without opening the WhatsApp app for users.

## Features

- ✅ Direct WhatsApp message sending from the website
- ✅ Booking form with all service details
- ✅ Professional UI with loading states
- ✅ Error handling and user feedback
- ✅ Multiple WhatsApp API options

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure WhatsApp Integration

You have several options for WhatsApp integration:

#### Option A: WhatsApp Business API (Recommended)
1. Set up a WhatsApp Business API account
2. Get your access token and phone ID
3. Set environment variables:
```bash
export WHATSAPP_TOKEN="your_access_token_here"
export WHATSAPP_PHONE_ID="your_phone_id_here"
```

#### Option B: Twilio WhatsApp API
1. Create a Twilio account
2. Get your Account SID and Auth Token
3. Uncomment the Twilio code in `server.js`
4. Set environment variables:
```bash
export TWILIO_ACCOUNT_SID="your_account_sid"
export TWILIO_AUTH_TOKEN="your_auth_token"
```

#### Option C: Manual Mode (Current Default)
- Messages are logged to the console for manual sending
- Perfect for testing and development

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:3000`

### 4. Test the Integration

1. Open `http://localhost:3000`
2. Click "Book Now" 
3. Fill out the booking form
4. Submit the form
5. Check the server console for the WhatsApp message

## Environment Variables

Create a `.env` file in the root directory:

```env
# WhatsApp Business API
WHATSAPP_TOKEN=your_access_token_here
WHATSAPP_PHONE_ID=your_phone_id_here
WHATSAPP_API_URL=https://graph.facebook.com/v17.0/your_phone_id/messages

# Twilio (alternative)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token

# Server
PORT=3000
```

## File Structure

```
ScrubHub Express/
├── index.html          # Main website
├── styles.css          # Styling
├── server.js           # Backend server
├── package.json        # Dependencies
├── README.md          # This file
└── images/            # Website images
```

## API Endpoints

- `POST /api/submit-booking` - Submit booking form and send WhatsApp message

## WhatsApp Message Format

The system sends formatted messages like:

```
🧹 *NEW SCRUBHUB EXPRESS BOOKING* 🧹

*Service Type:* Residential Cleaning
*Date & Time:* 2024-01-15T14:00
*Address:* 123 Main St, Hull
*Extras:* Fridge Clean, Oven

*Contact Details:*
Name: John Doe
Email: john@example.com
Phone: +44123456789

*Payment Method:* online
*Message:* Please confirm ASAP

📞 Ready to confirm your booking!
```

## Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Run `npm install` to install dependencies

2. **WhatsApp messages not sending**
   - Check your API credentials
   - Verify phone number format (should be 447442850748)
   - Check server console for error messages

3. **CORS errors**
   - The server includes CORS middleware
   - Make sure you're accessing via `http://localhost:3000`

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check server console for WhatsApp message logs
- Test with manual mode first before setting up API credentials

## Production Deployment

For production deployment:

1. Set up proper environment variables
2. Use a process manager like PM2
3. Set up SSL certificates
4. Configure your domain

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start server.js --name "scrubhub-express"

# Save PM2 configuration
pm2 save
```

## Support

For issues or questions about the WhatsApp integration, check:
- Server console logs for error messages
- WhatsApp Business API documentation
- Twilio WhatsApp API documentation 