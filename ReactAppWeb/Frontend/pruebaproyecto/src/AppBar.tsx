import * as React from 'react';
import { AppBar, ToggleThemeButton } from 'react-admin';
import { useState } from 'react';

export const MyAppBar = () => (
    <AppBar toolbar={<ToggleThemeButton />} />
);