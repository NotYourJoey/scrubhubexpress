const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// WhatsApp API configuration
// You'll need to set up WhatsApp Business API or use a service like Twilio
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL || 'https://api.whatsapp.com/v1/messages';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || 'your_whatsapp_token_here';
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || 'your_phone_id_here';
const RECIPIENT_PHONE = '447442850748'; // Your WhatsApp number

// Route to handle booking form submission
app.post('/api/submit-booking', async (req, res) => {
    try {
        const {
            service,
            datetime,
            address,
            extras,
            name,
            email,
            phone,
            payment,
            message
        } = req.body;

        // Format the message for WhatsApp
        const formattedMessage = `🧹 *NEW SCRUBHUB EXPRESS BOOKING* 🧹

*Service Type:* ${service}
*Date & Time:* ${datetime}
*Address:* ${address}
*Extras:* ${extras || 'None'}

*Contact Details:*
Name: ${name}
Email: ${email}
Phone: ${phone}

*Payment Method:* ${payment}
*Message:* ${message || 'No additional message'}

📞 Ready to confirm your booking!`;

        // Send message to WhatsApp using WhatsApp Business API
        const whatsappResponse = await sendWhatsAppMessage(formattedMessage);

        if (whatsappResponse.success) {
            res.json({
                success: true,
                message: 'Booking submitted successfully! We will contact you shortly to confirm your appointment.',
                whatsappMessageId: whatsappResponse.messageId
            });
        } else {
            res.json({
                success: false,
                message: 'Booking submitted! We will contact you shortly to confirm your appointment.',
                error: whatsappResponse.error
            });
        }

    } catch (error) {
        console.error('Error submitting booking:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error submitting your booking. Please try again or contact us directly.',
            error: error.message
        });
    }
});

// Function to send WhatsApp message
async function sendWhatsAppMessage(message) {
    try {
        // Option 1: Using WhatsApp Business API (requires setup)
        if (WHATSAPP_TOKEN !== 'your_whatsapp_token_here') {
            const response = await axios.post(WHATSAPP_API_URL, {
                messaging_product: 'whatsapp',
                to: RECIPIENT_PHONE,
                type: 'text',
                text: { body: message }
            }, {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            return {
                success: true,
                messageId: response.data.messages[0].id
            };
        }

        // Option 2: Using Twilio WhatsApp API (alternative)
        // You can replace this with Twilio implementation if preferred
        // const twilioClient = require('twilio')(accountSid, authToken);
        // const twilioResponse = await twilioClient.messages.create({
        //     body: message,
        //     from: 'whatsapp:+14155238886',
        //     to: `whatsapp:+${RECIPIENT_PHONE}`
        // });

        // Option 3: Fallback - log the message for manual sending
        console.log('📱 WhatsApp Message to be sent:');
        console.log('To:', RECIPIENT_PHONE);
        console.log('Message:', message);
        console.log('---');
        console.log('Note: Set up WhatsApp Business API or Twilio to send messages automatically');
        console.log('For now, this message would need to be sent manually');

        return {
            success: true,
            messageId: 'manual-send-required'
        };

    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 ScrubHub Express server running on http://localhost:${PORT}`);
    console.log(`📱 WhatsApp integration ready`);
    console.log(`📧 Booking form endpoint: http://localhost:${PORT}/api/submit-booking`);
}); 