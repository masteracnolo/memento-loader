# Memento-Loader

> Memento-Loader is a simple web application to track and visualize the remaining time before a custom event or deadline.

## Features

- Add events with name, date, time, and optional note
- Display remaining time for each event
- Local saving of events (localStorage)
- Modern and responsive interface

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Memento-Loader.git
   cd Memento-Loader
   ```

2. Open with a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve

   # Or use VS Code Live Server extension
   ```

3. Open `http://localhost:8000` in your browser

**Alternative**: Simply open `index.html` directly in your browser (some features may require a server).

## Usage

- Click the `+` button to add a new event.
- Fill in the form (name, date, time, optional note) and submit.
- Events will be displayed with the remaining time.
- Data is automatically saved in your browser.

## Project Structure

```
Memento-Loader/
│
├── index.html                # Main HTML file
├── script/
│   ├── script.js             # Core logic (events, storage, countdown, theme)
│   └── aos-init.js           # AOS animations initialization
├── styles/
│   ├── styles.css            # Global styles & theme support
│   ├── variables.css         # CSS custom properties (light/dark)
│   ├── components/
│   │   ├── button.css        # Floating add button & theme toggle
│   │   └── card.css          # Event cards with visual states
│   └── layout/
│       ├── header.css        # Page header
│       ├── main.css          # Main container
│       ├── form.css          # Event form & modal
│       └── footer.css        # Footer
├── assets/                   # Static assets (icons, images)
├── test-countdown.html       # Countdown function test suite
└── README.md                 # This file
```

## External Dependencies

- [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) for animations
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

## Credits

Developed by MasterAcnolo. Icons and resources according to their respective licenses.

---

_For suggestions or bugs, please open an issue or pull request!_

## License

This project is licensed under the GNU General Public License v3.0.
