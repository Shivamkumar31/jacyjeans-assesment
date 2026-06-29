# 👖 Jackie Jeans Onboarding Experience

A premium AI-powered onboarding experience for Jackie Jeans with both manual form and voice-based quiz flows.

## 🚀 Features

- **Two Quiz Flows**
  - Manual Quiz: Beautiful form-based interface
  - AI Voice Quiz: Talk to your personal denim stylist using Web Speech API

- **10 Comprehensive Questions**
  - Height, Weight, Waist, Hip measurements
  - Fit preferences (Waist, Rise, Thigh)
  - Brand preferences with size selection
  - Biggest issue with jeans

- **Premium UI/UX**
  - Smooth animations with Framer Motion
  - Progress bar tracking
  - Mobile responsive design
  - Gradient backgrounds and modern styling

- **Tech Stack**
  - Next.js 14 + TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Zustand for state management
  - Web Speech API (no API keys required)

## 📋 Prerequisites

- Node.js 18+ and npm/yarn installed

## 🛠️ Installation

1. **Extract the project**
   ```bash
   cd jackie-jeans-onboarding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Welcome screen
├── globals.css                # Global styles
└── welcome/
    ├── manual/
    │   ├── page.tsx
    │   └── components/
    │       └── ManualQuiz.tsx
    ├── voice/
    │   ├── page.tsx
    │   └── components/
    │       └── VoiceQuiz.tsx
    └── completion/
        └── page.tsx

components/
├── WelcomeScreen.tsx          # Welcome/choice screen
├── ProgressBar.tsx            # Progress indicator
├── QuestionCard.tsx           # Question wrapper
└── CompletionScreen.tsx       # Success screen

hooks/
├── useQuizStore.ts            # Zustand store for quiz state
└── useVoice.ts                # Speech Recognition hook

data/
└── quiz.ts                    # Quiz questions and options

types/
└── quiz.ts                    # TypeScript interfaces
```

## 🎯 How It Works

### Welcome Screen
Users choose between:
- **Manual Quiz**: Answer questions with clicks/selections
- **AI Voice Quiz**: Talk to the AI stylist

### Manual Flow
1. Dropdown selections for height, waist, hip
2. Radio options for fit preferences
3. Multi-select for brands
4. Dynamic brand size inputs
5. Completion screen with redirect

### Voice Flow
1. AI speaks each question
2. User's speech is transcribed using Web Speech API
3. Responses are parsed and validated
4. AI provides feedback and asks next question
5. Automatic progression to completion

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your repository
   - Deploy with default settings
   - Your app is live! 🎉

### Deploy Locally/Docker

```bash
npm run build
npm start
```

## 🎤 Voice Features

The voice quiz uses the **Web Speech API**:
- No API keys required
- Works in all modern browsers
- Real-time speech recognition and synthesis
- Fallback to manual input if not supported

**Browser Support:**
- Chrome/Edge ✅
- Firefox ✅
- Safari ✅ (iOS requires user interaction)

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly buttons
- Optimized for all screen sizes
- Voice input works great on mobile

## 🎨 Customization

### Colors
Edit in `tailwind.config.ts`:
```typescript
colors: {
  primary: '#1a1a1a',
  secondary: '#f5f5f5',
}
```

### Fonts
Change in `app/globals.css` and `tailwind.config.ts`

### Questions
Modify `data/quiz.ts`:
```typescript
export const QUESTIONS = [
  // Add/edit questions here
];
```

## 🔗 Integration

The completion screen redirects to:
```
https://jackie-jeans.vercel.app/
```

You can pass query parameters:
```javascript
router.push('/welcome/completion?height=5%278%22&waist=32%22...');
```

## ⚡ Performance

- Optimized for fast load times
- Next.js automatic code splitting
- Minimal bundle size (~50KB gzipped)
- No external API calls required

## 🐛 Troubleshooting

### Voice not working?
- Check browser compatibility (Chrome/Edge recommended)
- Enable microphone permissions
- Fall back to manual quiz

### Questions not showing?
- Clear browser cache
- Check that `data/quiz.ts` is properly loaded
- Verify all components are imported

### Build errors?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Try the manual flow if voice has issues

## 📄 License

MIT License - feel free to use this project

---

**Made with ❤️ for Jackie Jeans**
