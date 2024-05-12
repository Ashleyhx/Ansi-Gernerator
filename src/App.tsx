import React, {useEffect, useState} from 'react'
import './App.css'
import '@mantine/core/styles.css';
import {
    Button,
    ColorPicker,
    CopyButton,
    MantineColor,
    Stack,
} from '@mantine/core';
import {Flex, Layout} from "antd";
import {Header, Content} from "antd/lib/layout/layout";

const headerStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#261168',
    fontWeight: 'bold',

};

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
    const [textStyle, setTextStyle] = useState({
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: [],
    });
  const [styleCode, setStyleCode] = useState('');
  const [textCode, setText] = useState('');
  const [textBackground, setTextBackground] = useState('');
  const [color, setColor] = useState('');
    useEffect(() => {
        if (!color) {
            setText('');
            return;
        }
        const cleanColor = color.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setText(`\\x1b[38;2;${r};${g};${b}m `);
    }, [color]);

  const [background, setBackground] = useState('');
    useEffect(() => {
        if (!background) {
            setTextBackground('');
            return;
        }
        const cleanColor = background.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setTextBackground(`\\x1b[48;2;${r};${g};${b}`);
    }, [background]);

    const toggleStyle = (styleProp) => {
        setTextStyle(prevStyle => {
            if (!styleProp) return prevStyle;
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
                    setStyleCode((prevStyle.textDecoration.includes('underline') ? '' : ';4') + styleCode);
                } else {
                    setStyleCode((prevStyle.textDecoration.includes('line-through') ? '' : ';9') + styleCode);
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

    const reset = () => {
        setTextStyle({
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: [],
        });
        setColor('');
        setBackground('');
        setStyleCode('');
        setTextBackground('');
    };


  return (
      <Layout>
          <Header style={headerStyle}>Ansi Code Generator</Header>
          <Content>
              <Flex justify='center' align='center' gap='small'>
                  <p>RGB ANSI Code is: {textCode + textBackground + styleCode + (textBackground || styleCode? 'm' : '')}</p>

                  <CopyButton
                      // color='#261168'
                      value={textCode + textBackground + styleCode + (textBackground || styleCode? 'm' : '')}>
                      {({copied, copy}) => (
                          <Button
                              color={(copied ? 'teal' : '#7a74c6') as MantineColor}
                              onClick={copy}
                          >
                              {copied ? 'Copied' : 'Copy'}
                          </Button>
                      )}
                  </CopyButton>
                  <Button
                      color='#7a74c6'
                      onClick={reset}
                  >
                      Reset
                  </Button>
              </Flex>


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
