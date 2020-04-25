import * as React from 'react';
import './Menu.scss'
import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonButtons, IonMenuButton
} from "@ionic/react";

type MyProps = {
    children: React.ReactElement
}

export const Menu: React.FC<MyProps> = (props: MyProps) => {
    return (
        <>
            <IonMenu side="start" menuId="firstMenu" contentId={'menu'}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='end'>
                            <IonMenuButton color='light' menu='first'/>
                        </IonButtons>
                        <IonTitle>Start Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonItem>Menu Item</IonItem>
                        <IonItem>Menu Item</IonItem>
                        <IonItem>Menu Item</IonItem>
                        <IonItem>Menu Item</IonItem>
                        <IonItem>Menu Item</IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
            {props.children}
        </>
    );
}
