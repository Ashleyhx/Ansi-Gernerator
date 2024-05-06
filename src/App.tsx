import { useState } from 'react'
import './App.css'
import Ansi from "ansi-to-react";
import { ColorPicker, Text } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0);
  const [ansiCode, setAnsiCode] = useState('');
  const [color, setColor] = useState('rgba(255, 0, 0, 1)');

  return (
      <>
          <h1>Ansi Code Generator</h1>
          <p>ANSI Code is: {ansiCode}</p>
          <h2><Ansi>{`${ansiCode}Test`}</Ansi></h2>

          <h2> COLOR IS {color}</h2>

          <h3> Text color </h3>
          <ColorPicker
              saturationLabel="Saturation"
              hueLabel="Hue"
              alphaLabel="Alpha"
              format="rgba"
              value={color}
              onChange={setColor}
          />
          {/*<ColorPicker format="rgba" value={color} onChange={setColor} />*/}
          <Text>{color}</Text>


          <div>
              <button onClick={() => setAnsiCode('')}>Reset</button>
                <button onClick={() => setAnsiCode((ansiCode) => ansiCode + '\u001b[31m')}>Red</button>
          </div>

          <select>
              <option onSelect={() => setAnsiCode((ansiCode) => ansiCode + '\u001b[31m')}>Red</option>
          </select>
          <p> AnsiCode is {ansiCode}</p>
      </>
  )
}

export default App
