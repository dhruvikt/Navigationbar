import React from 'react';
import './Header.css';
declare type NavigationBarState = {
    navigationdata: any;
};
export declare class NavigationBar extends React.Component<{}, NavigationBarState> {
    constructor(props: any);
    callRender(): void;
    getData: () => void;
    addLink: () => void;
    editLink: () => void;
    deleteLink: () => void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=NavigationBar.d.ts.map