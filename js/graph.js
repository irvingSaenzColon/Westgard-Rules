class Graph {
	constructor() {
		this.canvas = document.getElementById("chart");
		if(this.canvas.getContext) {
			this.aspectRatioX = 4;
			this.aspectRatioY = 3;
			this.idealYAxis = 35;
			this.context = this.canvas.getContext("2d");
			this.parentContainer = this.canvas.parentElement;
			let styles = window.getComputedStyle(this.parentContainer);
			styles = styles.getPropertyValue("max-width");
			if(styles !== "none") {
				this.idealWidth = styles.replace("px","");
				this.idealWdith = Number(this.idealWidth);
			}
			this.resizeCanvas();
			this.render();
		} else {
			console.error("Not supported by Browser");
		}

	}
	
	resizeCanvas() {
		window.addEventListener("resize", (event) => {
			let aspectRatioHorizontal = 0;
			aspectRatioHorizontal = this.canvas.width = this.parentContainer.offsetWidth;
			aspectRatioHorizontal = aspectRatioHorizontal / this.aspectRatioX;
			this.canvas.height = aspectRatioHorizontal * this.aspectRatioY;
			this.render();
		})
	}

	render() {
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.fillStyle = "#ff5733";
		this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
		this.DrawAxis();
	}

	DrawAxis() {
		let realYAxisPosition = (this.idealYAxis * this.canvas.width) / this.idealWidth;
		this.context.lineWidth = (4 * this.canvas.width) / this.idealWidth;
		this.context.beginPath();
		this.context.moveTo(realYAxisPosition, 0);
		this.context.lineTo(realYAxisPosition, this.canvas.height);
		this.context.stroke();
		this.context.moveTo(0, this.canvas.height - realYAxisPosition);
		this.context.lineTo(this.canvas.width,this.canvas.height - realYAxisPosition);
		this.context.stroke();
	}
}

export default Graph;
