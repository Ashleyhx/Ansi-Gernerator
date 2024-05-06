import {useEffect, useState} from 'react'
import './App.css'
import '@mantine/core/styles.css';
import Ansi from "ansi-to-react";
import {ColorPicker, Stack, Text, Title} from '@mantine/core';
import {Container} from "postcss";

function App() {
  const [ansiCodeText, setAnsiCodeText] = useState('');
  const [ansiCodeBackground, setAnsiCodeBackground] = useState('');
  const [textCode, setText] = useState('');
  const [textBackground, setTextBackground] = useState('');
  const [color, setColor] = useState('rgba(255, 0, 0, 1)');
    useEffect(() => {
        const cleanColor = color.replace('rgba(', '').replace(')', '');
        const [r, g, b, a] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setAnsiCodeText(`\x1b[38;2;${r};${g};${b}m `);
        setText(`\\x1b[38;2;${r};${g};${b}m `);
    }, [color]);

  const [background, setBackground] = useState('rgba(0, 255, 0, 1)');
    useEffect(() => {
        const cleanColor = background.replace('rgba(', '').replace(')', '');
        const [r, g, b, a] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setAnsiCodeBackground(`\x1b[48;2;${r};${g};${b}m`);
        setTextBackground(`\\x1b[48;2;${r};${g};${b}m`);
    }, [background]);


  return (
      <>
          <h1>Ansi Code Generator</h1>
          <p>RGB ANSI Code is: {textCode} {textBackground}</p>
          <h2><Ansi>{`${ansiCodeText} ${ansiCodeBackground} Test`}</Ansi></h2>

          <h2> COLOR IS {color}</h2>

          <h3> Text color </h3>
          <Stack>
              <ColorPicker format="rgba" value={color} onChange={setColor} />
          </Stack>

          <h3> Background color </h3>
          <Stack>
              <ColorPicker format="rgba" value={background} onChange={setBackground} />
          </Stack>

          <p> AnsiCode is {ansiCodeText}</p>
      </>
  )
}

export default App
