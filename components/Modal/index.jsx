import React from 'react';
import styles from './Modal.module.scss';

export function Modal({ show, setShow, className, children }, ...args) {
	if (!show) return null;
	return (
		<div 
			className={styles.wrapper} 
			onClick={
				(e) => {setShow(false)}
			}
		>
			<div className={[styles.Modal, className].join(' ')} {...args}>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
}

export default Modal;
