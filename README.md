# Bird Rescue Web Application

A modern web application built with Next.js and TypeScript for reporting and assisting injured birds. The application features AI-powered bird species identification, real-time information gathering, and a user-friendly interface for submitting rescue reports.

## Features

### 🦜 Bird Identification
- AI-powered bird species recognition using DragonEye API
- Real-time species information retrieval
- Dynamic care instructions based on identified species

### 📝 Smart Form Management
- Automatic form data persistence using localStorage
- Real-time validation for email and phone numbers
- Responsive and accessible form design
- Modern UI with Tailwind CSS

### 🚨 Emergency Features
- Prominent emergency contact information
- Quick-access emergency hotline
- Immediate care instructions

### 💾 Data Management
- Local storage for form data persistence
- Automatic form recovery on page reload
- Secure handling of sensitive information

## Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn
- A DragonEye API key for bird species identification

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/birdrescue-fe.git
cd birdrescue-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root and add your DragonEye API key:
```env
NEXT_PUBLIC_DRAGONEYE_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_DRAGONEYE_API_KEY`: Your DragonEye API key for bird species identification

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **API Integration**: DragonEye AI API
- **Storage**: Local Storage API
- **Image Handling**: Next.js Image Component

## Project Structure

```
birdrescue-fe/
├── app/
│   ├── components/
│   ├── contact/
│   │   └── page.tsx      # Contact form with bird identification
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── styles/
├── .env.local
├── package.json
└── README.md
```

## Features in Detail

### Bird Species Identification
The application uses DragonEye's AI API to identify bird species from uploaded images. This helps in providing accurate care instructions and species-specific information.

### Form Validation
- Email validation with regex pattern
- Phone number validation with international format support
- Required field validation
- Real-time feedback on validation errors

### Data Persistence
Form data is automatically saved to localStorage and restored when:
- The page is reloaded
- The browser is closed and reopened
- The user navigates away and returns

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized layouts
- Accessible form controls
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- DragonEye API for bird species identification
- Next.js team for the amazing framework
- Tailwind CSS for the styling system
- All contributors and maintainers

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
