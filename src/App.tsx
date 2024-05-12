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

const boxStyleButtons: React.CSSProperties = {
    width: '100%',
    height: 120,
    borderRadius: 6,
    border: '1px solid #40a9ff',
};

function App() {
  // const [ansiCodeText, setAnsiCodeText] = useState('');
  // const [ansiCodeBackground, setAnsiCodeBackground] = useState('');
  // const [ansiCodeStyle, setAnsiCodeStyle] = useState(';3;4m');
    const [textStyle, setTextStyle] = useState({
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: [],
    });
  const [styleCode, setStyleCode] = useState('');
  const [textCode, setText] = useState('');
  const [textBackground, setTextBackground] = useState('');
  const [color, setColor] = useState('rgba(255, 0, 0, 1)');
    useEffect(() => {
        const cleanColor = color.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        // setAnsiCodeText(`\x1b[38;2;${r};${g};${b}m `);
        setText(`\\x1b[38;2;${r};${g};${b}m `);
    }, [color]);

  const [background, setBackground] = useState('rgba(0, 255, 0, 1)');
    useEffect(() => {
        const cleanColor = background.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        // setAnsiCodeBackground(`\x1b[48;2;${r};${g};${b}`);
        setTextBackground(`\\x1b[48;2;${r};${g};${b}`);
    }, [background]);

    const toggleStyle = (styleProp) => {
        setTextStyle(prevStyle => {
            if (styleProp === 'fontWeight') {
                setStyleCode((prevStyle.fontWeight === 'normal' ? ';1' : '') + styleCode);
                return {
                    ...prevStyle,
                    fontWeight: prevStyle.fontWeight === 'normal' ? 'bold' : 'normal'
                };
            } else if (styleProp === 'fontStyle') {
                setStyleCode((prevStyle.fontStyle === 'normal' ? ';3' : '') + styleCode);
                return {
                    ...prevStyle,
                    fontStyle: prevStyle.fontStyle === 'normal' ? 'italic' : 'normal'
                };
            } else if (styleProp === 'underline' || styleProp === 'line-through') {
                if (styleProp === 'underline') {
                    setStyleCode((prevStyle.textDecoration.includes('underline') ? ';4' : '') + styleCode);
                } else {
                    setStyleCode((prevStyle.textDecoration.includes('line-through') ? ';9' : '') + styleCode);
                }
                const currentDecorations = prevStyle.textDecoration;
                const isCurrentlySet = currentDecorations.includes(styleProp);
                const newDecorations = isCurrentlySet
                    ? currentDecorations.filter(deco => deco !== styleProp)
                    : [...currentDecorations, styleProp];

                return {
                    ...prevStyle,
                    textDecoration: newDecorations
                };
            }
            return prevStyle;
        });
    };


  return (
      <Layout>
          <Header color='white'>Ansi Code Generator</Header>
          <Content>
              <p>RGB ANSI Code is: {textCode + textBackground + textStyle + 'm'}</p>

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

              {/*<CopyButton value="https://mantine.dev" timeout={2000}>*/}
              {/*    {({copied, copy}) => (*/}
              {/*        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">*/}
              {/*            <ActionIcon color={(copied ? 'teal' : 'blue') as MantineColor} variant="subtle"*/}
              {/*                        onClick={copy}>*/}
              {/*            </ActionIcon>*/}
              {/*        </Tooltip>*/}
              {/*    )}*/}
              {/*</CopyButton>*/}

              {/*<h2><Ansi>{`${ansiCodeText}${ansiCodeBackground}${ansiCodeStyle}  Test`}</Ansi></h2>*/}
              <h2>
                  <span style={{color: color}}>
                    <span style={{backgroundColor: background,}}>
                        <span
                            style={
                                {
                                    fontWeight: textStyle.fontWeight,
                                    fontStyle: textStyle.fontStyle,
                                    textDecoration: textStyle.textDecoration.join(' ')
                                } as React.CSSProperties
                            }>Test</span>
                    </span>
                  </span>
              </h2>

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

              <Flex style={boxStyleButtons} justify='center' align='center' gap='middle'>
                  <h3> Styles: </h3>
                  <Button
                      color={(textStyle["fontWeight"] === 'bold' ? 'blue' : 'gray') as MantineColor}
                      onClick={() => toggleStyle('fontWeight')}>
                      Toggle Bold
                  </Button>
                  <Button
                      color={(textStyle["fontStyle"] === 'italic' ? 'blue' : 'gray') as MantineColor}
                      onClick={() => toggleStyle('fontStyle')}>
                      Toggle Italic
                  </Button>
                  <Button
                      color={(textStyle["textDecoration"].includes('underline') ? 'blue' : 'gray') as MantineColor}
                      onClick={() => toggleStyle('underline')}>
                      Toggle Underline
                  </Button>
                  <Button
                      color={(textStyle["textDecoration"].includes('line-through') ? 'blue' : 'gray') as MantineColor}
                      onClick={() => toggleStyle('line-through')}>
                      Toggle Strikethrough
                  </Button>
              </Flex>

          </Content>
      </Layout>

  )
}

export default App
