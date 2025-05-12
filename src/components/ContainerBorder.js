export default function ContainerBorder({ children, className = "" }) {
    return (
        <div className="container-fluid section-primary">
            <div className={`hero row flex-nowrap ${className}`}>
                {children}
            </div>
        </div>
    );
}