import React, { Component } from 'react';
import { borderUrl } from './BorderHelper';

// const randomTestElement = (v: string[]): string => {
//   return v[Math.floor(Math.random() * v.length)];
// };

// const testTitles = [
//   'Tojásleves gazdagon',
//   'Zöldségleves',
//   'Tárkonyos raguleves',
//   'Lencsefőzelék',
//   'Chilis bab',
//   'Palacsinta',
//   'Paradicsomleves',
//   'Paprikás krumpli',
//   'Bolognai spagetti',
//   'Gyümölcsleves',
//   'Tejbegríz',
//   'Brassói',
// ];
// const testColors = ['#72bf44', '#5c3896', '#f39200', '#0075bf', '#da0812', '#5b2919', '#009a93'];

function margin(align: string | undefined): string {
  switch (align) {
    case 'right':
      return '0 0 0 auto';
    case 'left':
      return '0 auto 0 0';
    case 'center':
    default:
      return 'auto';
  }
}

export class Border extends Component<{ backgroundColor: string; align?: 'left' | 'center' | 'right' }> {
  render(): JSX.Element {
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${borderUrl(this.props.backgroundColor)})`,
            width: 'fit-content',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            // margin: '20px',
            margin: `${margin(this.props.align)}`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class HeaderBorder extends Component<{
  text: string;
  backgroundColor: string;
  fontSize: number;
  align?: 'left' | 'center' | 'right';
}> {
  render(): JSX.Element {
    return (
      <Border align={this.props.align} backgroundColor={this.props.backgroundColor}>
        <p
          style={{
            margin: '0 20px 0 20px',
            padding: '10px 0 15px 0',
            color: 'white',
            fontFamily: 'Patrick Hand',
            fontSize: `${this.props.fontSize}px`,
          }}
        >
          {this.props.text}
        </p>
      </Border>
    );
  }
}
