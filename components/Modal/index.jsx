import styles from './Modal.module.scss';

export function Modal({ 
		show, 
		setShow, 
		className, 
		children, 
		wrapperStyle, 
		style
	}, 
	...args
){
	if (!show) return null;

	return (
		<div 
			className={styles.wrapper} 
			style={wrapperStyle}
			onClick={(e) => setShow(false)}
		>
			<div className={[styles.Modal, className].join(' ')} 
				style={style} 
				{...args}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles.content}>{children}</div>
			</div>
		</div>
	);
}

export default Modal;
