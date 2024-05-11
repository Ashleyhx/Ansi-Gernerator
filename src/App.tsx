import {useEffect, useState} from 'react'
import './App.css'
import '@mantine/core/styles.css';
import Ansi from "ansi-to-react";
import {
    ActionIcon,
    Button,
    ColorPicker,
    CopyButton,
    MantineColor,
    Stack,
    Tooltip
} from '@mantine/core';

function App() {
  const [ansiCodeText, setAnsiCodeText] = useState('');
  const [ansiCodeBackground, setAnsiCodeBackground] = useState('');
  const [textCode, setText] = useState('');
  const [textBackground, setTextBackground] = useState('');
  const [color, setColor] = useState('rgba(255, 0, 0, 1)');
    useEffect(() => {
        const cleanColor = color.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setAnsiCodeText(`\x1b[38;2;${r};${g};${b}m `);
        setText(`\\x1b[38;2;${r};${g};${b}m `);
    }, [color]);

  const [background, setBackground] = useState('rgba(0, 255, 0, 1)');
    useEffect(() => {
        const cleanColor = background.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setAnsiCodeBackground(`\x1b[48;2;${r};${g};${b}m\x1b[4m`);
        setTextBackground(`\\x1b[48;2;${r};${g};${b}m`);
    }, [background]);


  return (
      <>
          <h1>Ansi Code Generator</h1>
          <p>RGB ANSI Code is: {textCode + textBackground}</p>

          <CopyButton value={textCode + textBackground}>
              {({ copied, copy }) => (
                  <Button
                      color={(copied ? 'teal' : 'blue') as MantineColor}
                      onClick={copy}
                  >
                      {copied ? 'Copied' : 'Copy'}
                  </Button>
              )}
          </CopyButton>

          <CopyButton value="https://mantine.dev" timeout={2000}>
              {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={(copied ? 'teal' : 'blue') as MantineColor} variant="subtle" onClick={copy}>
                      </ActionIcon>
                  </Tooltip>
              )}
          </CopyButton>
          <h2><Ansi>{`${ansiCodeText}${ansiCodeBackground} Test`}</Ansi></h2>


          <h3> Text color </h3>
          <Stack>
              <ColorPicker format="rgba" value={color} onChange={setColor} />
          </Stack>

          <h3> Background color </h3>
          <Stack>
              <ColorPicker format="rgba" value={background} onChange={setBackground} />
          </Stack>
      </>
  )
}

export default App
