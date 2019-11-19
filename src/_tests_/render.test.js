import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import ContentHandler from '../Components/ContentHandler';
import Profile from '../Components/profile/Profile';
import Detail from '../Components/profile/Detail';
import MakeChatDetails from '../Components/makechatroom/MakeChatDetails';
import MakeChatroom from '../Components/makechatroom/makechatroom';
import Header from '../Components/homepage/header';
import HomePage from '../Components/homepage/HomePage';
import LandingPage from '../Components/homepage/LandingPage';
import ChatWindow from '../Components/chatroom/Chat/ChatWindow';
import UserList from '../Components/chatroom/UserList';
import Queue from '../Components/chatroom/Queue/Queue';
import Lounge from '../Components/chatroom/Lounge';
import Player from '../Components/chatroom/Player/Player';
import SliderCom from '../Components/chatroom/Player/Slider';
import ChatBubble from '../Components/chatroom/Chat/ChatBubble';
import Chat from '../Components/chatroom/Chat/Chat';
import Messenger from '../Components/chatroom/Chat/Messenger';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentHandler />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Profile />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Detail />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MakeChatDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MakeChatroom />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Lounge />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Queue />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserList />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SliderCom />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chat />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatBubble />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChatWindow/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Messenger />, div);
  ReactDOM.unmountComponentAtNode(div);
});
