import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import Ansi from "ansi-to-react";
import {AppShell, ColorPicker, Stack, Text, Title} from '@mantine/core';
import {Container} from "postcss";

function App() {
  const [count, setCount] = useState(0);
  const [ansiCode, setAnsiCode] = useState('');
  const [color, setColor] = useState('rgba(255, 0, 0, 1)');

  const cleanColor = color.replace('rgba(', '').replace(')', '');
  const [r, g, b, a] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
  const rgbAnsiCode = '\u001b[38;2;${r};${g};${b}m';

  return (
      <>
          <h1>Ansi Code Generator</h1>
          <p>RGB ANSI Code is: \1b[38;2;${r};${g};${b}m</p>
          <h2><Ansi>{`\u001b[38;2;${r};${g};${b}mTest`}</Ansi></h2>

          <h2> COLOR IS {color}</h2>
            <h3> Red is {r}, Green is {g}, Blue is {b}, Alpha is {a}</h3>

          <h3> Text color </h3>
          <Stack>
              <ColorPicker format="rgba" value={color} onChange={setColor} />
              {/*{r, g, b, a} = color.rgb: {color}*/}
          </Stack>

          {/*<Text>{color}</Text>*/}


          <select>
              <option onSelect={() => setAnsiCode((ansiCode) => ansiCode + '\u001b[31m')}>Red</option>
          </select>
          <p> AnsiCode is {ansiCode}</p>
      </>
  )
}

export default App
