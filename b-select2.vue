<template>
	<b-col-sm :colspan="colspan" :coloffset="coloffset">
		<select v-el:select :id="id" style="width: 100%" :multiple="isMultiple" :disabled="isDisabled" :readonly="isReadonly" :required="isRequired">
			<option v-if="!isMultiple && isAllowClear"></option>
			<option v-for="o in processedOptions" value="{{ o.key }}">{{{ o.render }}}</option>
		</select>
	</b-col-sm>
</template>

<script>
	
	module.exports = {
		name: 'b-select2',
		mixins: [require('./mixin-select2.js')],
	};

</script>
