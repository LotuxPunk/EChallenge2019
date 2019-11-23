import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next';

export default function Title() {
    const {t} = useTranslation('common');
    return (
        <Fragment>
            <h1>{t('home_title')}</h1>
        </Fragment>
    )
}
