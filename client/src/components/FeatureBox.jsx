// ============================================
// TRADE HUB - Feature Box Component
// ============================================
// Displays feature highlights like free shipping, 24/7 support, etc.

function FeatureBox({ image, title }) {
    return (
        <div className="fe-box">
            <img src={image} alt={title} height="120px" />
            <h6>{title}</h6>
        </div>
    );
}

export default FeatureBox;
