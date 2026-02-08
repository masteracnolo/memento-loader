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
   ```
2. Open the folder in your editor or serve it with a local server (e.g. Live Server, Python http.server, etc.)
3. Open `index.html` in your browser.

## Usage

- Click the `+` button to add a new event.
- Fill in the form (name, date, time, optional note) and submit.
- Events will be displayed with the remaining time.
- Data is automatically saved in your browser.

## Project Structure

```
Memento-Loader/
│
├── index.html                # Main page
├── script/
│   ├── script.js             # Main logic (event management, localStorage)
│   └── aos-init.js           # AOS animations initialization
├── styles/
│   ├── styles.css            # Global styles
│   ├── variables.css         # CSS variables
│   ├── components/           # Component styles (buttons, cards...)
│   └── layout/               # Layout styles (header, main, footer...)
├── assets/                   # Images, icons, static files
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
