import { useState } from 'react'
import '../App.css'
import Letter from './Letter'
import Keyboard_language from './Keyboard_language'
import Delete_Undo from './Delete_Undo'
import Letter_case from './Letter_case'
import Display from './Display'
import Style from './Style'
import '../style/Keyboard.css'

const English_letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
const Hebrew_letters = ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ', 'ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף', 'ז', 'ס', 'ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'];
const Greek_letters = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'];
const Sign_language = ['🤲', '👐', '🙌', '👏', '🤝', '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👌', '👈', '👉', '👆', '👇'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const language = ["English", "עברית", "Ελληνικά", "Sign language", "numbers"];
const special_char = [',', '.', '?', '!', 'space', 'enter', ':', '"', '@'];
const cases = ['lower', 'UPPER'];
const colors = ["red", "black", "green"];
const sizes = ['+', '-'];
const fonts = ['Helvetica', 'Papyrus', 'Comic Sans MS', 'Arial']

function Keyboard() {
  const [display, set_display] = useState([]);
  const [keyboard_language, set_keyboard_language] = useState(English_letters);
  const [caps_lock, set_caps_lock] = useState(false);
  const [color, set_color] = useState("black");
  const [size, set_size] = useState(14);
  const [font, set_font] = useState('Arial');
  const [last_actions, set_last_actions] = useState([]);

  const display_letter = (letter) => {
    set_last_actions((prev_actions) => {
      return [...prev_actions, display]
    })
    if (letter == "enter" || letter == "ENTER")
      letter = '\n';
    else if (letter == "space" || letter == "SPACE")
      letter = " ";
    set_display((prev_string) => {
      return [...prev_string, { value: letter, color: color, size: size, font: font }];
    });
  };

  const switch_language = (language) => {
    let nextLanguage;
    switch (language) {
      case "English":
        nextLanguage = English_letters;
        break;
      case "עברית":
        nextLanguage = Hebrew_letters;
        break;
      case "Ελληνικά":
        nextLanguage = Greek_letters;
        break;
      case "Sign language":
        nextLanguage = Sign_language;
        break;
      case 'numbers':
        nextLanguage = numbers;
        break;
      case 'lower':
        set_caps_lock(false);
        return;
      case 'UPPER':
        set_caps_lock(true);
        return;
    }
    set_keyboard_language(nextLanguage);
  };

  const delete_letter = (amount) => {
    set_last_actions((prev_actions) => {
      return [...prev_actions, display]
    })
    set_display((prev_string) => {
      if (amount === 'single')
        return prev_string.slice(0, -1);
      else return [];
    });
  };

  const switch_case = (to_string_case) => {
    set_last_actions((prev_actions) => {
      return [...prev_actions, display]
    })
    switch (to_string_case) {
      case 'lower':
        set_display(display.map((letter) => {
          return { value: letter.value.toLowerCase(), color: letter.color, size: letter.size, font: letter.font }
        }))
        break;
      case 'UPPER':
        set_display(display.map((letter) => {
          return { value: letter.value.toUpperCase(), color: letter.color, size: letter.size, font: letter.font }
        }))
        break;
    }
  };

  const change_color = (color) => {
    set_color(color);
  };

  const change_size = (sign) => {
    if (sign === '+')
      set_size(size + 10);
    else
      set_size(size - 10);
  };

  const change_font = (font) => {
    set_font(font);
  };

  const undo = () => {
    if (last_actions.length > 0) {
      set_display(last_actions[last_actions.length - 1])
      set_last_actions((prev_actions) => {
        return prev_actions.slice(0, -1);
      })
    }
  }

  return (
    <>
      <div id="keyBoard" style={{ whiteSpace: "pre-line" }}>
        <Display letters={display} />
        <div>
          <Letter letters={[...keyboard_language, ...special_char]} on_letter_click={display_letter} let_case={caps_lock} />
        </div></div>
      <div>
        <br />
        <Keyboard_language languages={[...language, ...cases]} funcToSwitch={switch_language} /><br /><br />
        <Delete_Undo on_delete_click={delete_letter} amount={'single'} type={'delete'} />
        <Delete_Undo on_delete_click={delete_letter} amount={'all'} type={'delete'} />
        <Delete_Undo on_delete_click={undo} amount={''} type={'undo last'} />
        <Letter_case cases={cases} funcToSwitch={switch_case} /> <br /><br />
        <p>change text color</p>
        <Style styles={colors} on_style_click={change_color} />
        <br />
        <p>change text font</p>
        <Style styles={fonts} on_style_click={change_font} />
        <br />
        <p>change text size</p>
        <Style styles={sizes} on_style_click={change_size} />
        <br />
      </div>
    </>
  )
}

export default Keyboard