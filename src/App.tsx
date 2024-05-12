import React, {useEffect, useState} from 'react'
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
import {Flex, FlexProps, Layout} from "antd";
import {Header, Content} from "antd/lib/layout/layout";

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 320,
    borderRadius: 6,
    border: '1px solid #40a9ff',
};



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
        setAnsiCodeBackground(`\x1b[48;2;${r};${g};${b}m`);
        setTextBackground(`\\x1b[48;2;${r};${g};${b}m`);
    }, [background]);

  return (
      <Layout>
          <Header color='white'>Ansi Code Generator</Header>
          <Content>
              <p>RGB ANSI Code is: {textCode + textBackground}</p>

              <CopyButton value={textCode + textBackground}>
                  {({copied, copy}) => (
                      <Button
                          color={(copied ? 'teal' : 'blue') as MantineColor}
                          onClick={copy}
                      >
                          {copied ? 'Copied' : 'Copy'}
                      </Button>
                  )}
              </CopyButton>

              <CopyButton value="https://mantine.dev" timeout={2000}>
                  {({copied, copy}) => (
                      <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                          <ActionIcon color={(copied ? 'teal' : 'blue') as MantineColor} variant="subtle"
                                      onClick={copy}>
                          </ActionIcon>
                      </Tooltip>
                  )}
              </CopyButton>
              <h2><Ansi>{`${ansiCodeText}${ansiCodeBackground} Test`}</Ansi></h2>

              <Flex style={boxStyle} justify='center' align='center' gap='large'>
                  <Stack>
                      <h3> Text color </h3>
                      <ColorPicker format="rgba" value={color} onChange={setColor}/>
                  </Stack>

                  <Stack>
                      <h3> Background color </h3>
                      <ColorPicker format="rgba" value={background} onChange={setBackground}/>
                  </Stack>
              </Flex>


          </Content>


      </Layout>

  )
}

export default App
