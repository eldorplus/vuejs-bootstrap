var Type = require('type-of-is');

module.exports = {
	data: function () {
		return {
			columns: []
		};
	},
	computed: {
		headers: function () {
			var result = [];

			var maxDepth = 1;
			for (var i = 0; i < this.columns.length; ++i) {
				var col = this.columns[i];
				if (Type.is(col.header, Array)) {
					maxDepth = Math.max(maxDepth, col.header.length);
				}
			}

			for (var i = 0; i < this.columns.length; ++i) {
				var col = this.columns[i];

				var titles = col.header;
				if (!Type.is(titles, Array)) {
					titles = [titles];
				}

				var insideNew = false;

				for (var j = 0; j < titles.length; ++j) {
					var title = titles[j];

					if (result.length <= j) {
						result[j] = [];
					}

					var headerLine = result[j];
					var header = headerLine[headerLine.length - 1] || {};

					if (insideNew || header.title !== title) {
						header = {
							rowspan: 1,
							colspan: 0,
							title: title
						};

						headerLine.push(header);

						insideNew = true;
					}

					header.colspan++;

					if (j == titles.length - 1) {
						if (col.width) {
							header.width = col.width;
						}
						header.rowspan = maxDepth - j;
						header.order = true;
						header.index = i;
					}
				}
			}

			return result;
		}
	},
	ready: function () {
		for (var i = 0; i < this.$children.length; ++i) {
			var child = this.$children[i];

			if (child.$options.tag != 'b-column')
				continue;

			this.columns.push(child.$data);
		}
	}
};
